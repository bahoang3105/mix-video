import Conference from './Conference';

const ConferenceButton = (props) => {
  return (
    <div onClick={() => props.addLayer('conference')}>
      <Conference name='Conference' />
    </div>
  );
}

export default ConferenceButton;