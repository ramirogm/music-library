const masterLibraryData = require("../data/master_library_data.json");

module.exports.getUserLibrary = async userId => {
  let user = masterLibraryData.users[userId];
  if (!user) return null;
  let userLibrary = user.library;
  return userLibrary;
};

module.exports.getTrack = async trackId => {
  let track = masterLibraryData.tracks[trackId];
  return track;
};
