const Meeting = require('../../model/schema/meeting');

// Create a new Meeting
const add = async (req, res) => {
  try {
    const meeting = new Meeting({
      ...req.body,
      createdDate: new Date(),
      deleted: false
    });

    const savedMeeting = await meeting.save();
    return res.status(201).json({ success: true, data: savedMeeting });
  } catch (err) {
    console.error('Error adding meeting:', err);
    return res.status(500).json({ success: false, error: 'Failed to create meeting.' });
  }
};

// Get all Meetings (optional filter by createdBy if needed later)
const index = async (req, res) => {
  try {
    const query = { deleted: false };
    const meetings = await Meeting.find(query).sort({ createdDate: -1 });

    return res.status(200).json({ success: true, data: meetings });
  } catch (err) {
    console.error('Error fetching meetings:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch meetings.' });
  }
};

// Get a specific Meeting by ID
const view = async (req, res) => {
  try {
	const meeting = await Meeting.findById(req.params.id);

	// Check if deleted here manually to avoid an unnecessary compound query
    if (!meeting || meeting.deleted) {
      return res.status(404).json({ success: false, error: 'Meeting not found.' });
    }

    return res.status(200).json({ success: true, data: meeting });
  } catch (err) {
    console.error('Error viewing meeting:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch meeting.' });
  }
};

// Soft-delete a specific Meeting by ID
const deleteData = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ success: false, error: 'Meeting not found.' });
    }

    return res.status(200).json({ success: true, data: meeting });
  } catch (err) {
    console.error('Error deleting meeting:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete meeting.' });
  }
};

// Soft-delete multiple Meetings by ID array
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid IDs provided.' });
    }

    const result = await Meeting.updateMany(
      { _id: { $in: ids } },
      { $set: { deleted: true } }
    );

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('Error deleting multiple meetings:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete meetings.' });
  }
};

module.exports = {
  add,
  index,
  view,
  deleteData,
  deleteMany
};
