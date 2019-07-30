const cloudinary = require('cloudinary').v2;
const Promise = require('bluebird');

exports.deleteOldImageAndUploadNewImage = async (data, config = {}) => {
  const { oldImageId, newImage } = data;
  const result = await Promise.props({
    idDeleted: cloudinary.uploader.destroy(oldImageId),
    isUploaded: cloudinary.uploader.upload(newImage, config),
  });

  if (
    result.idDeleted.result !== (oldImageId == 'null' ? 'not found' : 'ok') ||
    !result.isUploaded
  ) {
    return false;
  }

  return result.isUploaded;
};

exports.uploadCoverImage = async coverImage => {
  const config = {
    folder: 'Coders-Tokyo-Forum/posts',
    use_filename: true,
    unique_filename: true,
    resource_type: 'image',
    transformation: [
      {
        width: 730,
        height: 480,
      },
    ],
  };

  return cloudinary.uploader.upload(coverImage, config);
};

exports.uploadManyImages = async (images, config = {}) => {
  const uploadImagePromise =  image => {
    return new Promise((resolve, reject) => {
      try {
        const uploadedImage = cloudinary.uploader.upload(image, config);
        return resolve(uploadedImage);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const uploadImagePromises = images.map(image => uploadImagePromise(image));
  return Promise.all(uploadImagePromises);
};
