const getDisplayMedia = async () => {
  try {
    return await navigator.mediaDevices.getDisplayMedia();
  } catch (err) {
    console.log(err);
  }
};

export default getDisplayMedia;