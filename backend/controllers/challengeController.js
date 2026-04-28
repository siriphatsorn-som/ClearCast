import * as ChallengeModel from "../models/challengeModel.js";
import cloudinary from "../config/cloudinary.js";

export const uploadEntry = async (req, res) => {
  try {
    const { key } = req.params;
    const normalizedKey = key.toLowerCase().trim();
    const { conditionCode, conditionLabel, city, note } = req.body;
    const file = req.file;

    let imageURL = null;

    if (file) {
      const result = await uploadFromBuffer(file);
      imageURL = result.secure_url;
    }

    await ChallengeModel.upsertEntry(req.user.uid, normalizedKey, {
      conditionCode: Number(conditionCode),
      conditionLabel: conditionLabel?.trim(),
      city: city?.trim(),
      imageURL,
      note: note?.trim() ?? "",
      displayName: req.user.name ?? "",
      photoURL: req.user.picture ?? null,
    });

    res.json({ success: true, imageURL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadFromBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "photoCollection",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};

export const getCollection = async (req, res) => {
  try {
    const entries = await ChallengeModel.getCollection(req.user.uid);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { key } = req.params;
    const normalizedKey = key.toLowerCase().trim(); // normalize
    const { note } = req.body;
    await ChallengeModel.updateEntry(req.user.uid, normalizedKey, {
      note: note?.trim(),
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { key } = req.params;
    const normalizedKey = key.toLowerCase().trim(); // normalize
    await ChallengeModel.deleteEntry(req.user.uid, normalizedKey);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommunity = async (req, res) => {
  try {
    const { condition, limit = 20 } = req.query;
    const normalizedCondition = condition?.toLowerCase().trim();
    const normalizedLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);

    const entries = normalizedCondition
      ? await ChallengeModel.getCommunityByCondition(
          normalizedCondition,
          normalizedLimit,
        )
      : await ChallengeModel.getCommunityEntries(normalizedLimit);

    res.json(entries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
