import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id as string)) {
    return res.status(400).json({ message: `Invalid ID: ${id}` });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res, id as string);
    case 'GET':
      return getEntry(res, id as string);
    case 'DELETE':
      return deleteEntry(res, id as string);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  id: string
) => {
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: `Entry with ID: ${id} not found` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.error(error);
    await db.disconnect();
    res
      .status(400)
      .json({
        message:
          error.errors.status.message || error.errors.description.message,
      });
  }
};

const getEntry = async (res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();

    if (!entry) {
      return res
        .status(404)
        .json({ message: `Entry with ID: ${id} not found` });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteEntry = async (res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect();
    const deletedEntry = await Entry.findByIdAndDelete(id);
    await db.disconnect();

    if (!deletedEntry) {
      return res
        .status(404)
        .json({ message: `Entry with ID: ${id} not found` });
    }

    res.status(200).json(deletedEntry);
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(500).json({ message: 'Something went wrong' });
  }
}
