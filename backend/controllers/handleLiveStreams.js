import ffmpeg from 'fluent-ffmpeg';
import { on } from 'nodemon';
import db from '../models';

const LiveStream = db.livestream;

export const publish = async (req,res, next) => {
  const { link } = req.body;
  const linkParams = link.split('/');
  const room = linkParams[3];
  const nameStream = linkParams[4];
  let checkReturn = 0;
  try {
    //check if livestream exists
    const livestreamExists = await LiveStream.findOne({ where: {
      room: room,
      name: nameStream,
    } });
    if(livestreamExists) {
      return res.status(200).json({ success: true, info: `This stream already exists. Don't need to republish` });
    }

    // if livestream does not exist, republish this and add to db
    ffmpeg()
      .addInput(link)
      .outputOption([
        '-c copy', 
        '-f flv',
      ])
      // handle error
      .on('error', async (err, stdout, stderr) => {
        // if livestream exists in database, delete it
        const livestreamExists = await LiveStream.destroy({ where: {
          room: room,
          name: nameStream,
        } });
        return res.status(404).json({ success: false, info: err.message });
      })
      // when livestream start, add it to database
      .on('start', async (stdout, stderr) => {
        await LiveStream.create({
          room,
          name: nameStream,
        });
      })
      // if rtmp is valid, return success
      .on('progress', () => {
        checkReturn += 1;
        if(checkReturn === 1) {
          return res.status(200).json({ success: true, info: 'Republish successfully'});
        }
      })
      // publish to this link
      .save(`rtmp://localhost:19351/${room}/${nameStream}`)
      // when this stream end, delete it from database
      .on('end', async (stdout, stderr) => {
        const livestreamExists = await LiveStream.destroy({ where: {
          room: room,
          name: nameStream,
        } });
      });
  } catch (err) {
    next(err)
  }
}