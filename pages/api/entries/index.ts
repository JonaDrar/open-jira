import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return createEntry(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnect();

  res.status(200).json(entries);
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
 
  if (!description) {
    return res.status(422).json({ message: 'Description is required' });
  }

  try {
    await db.connect();
    const entry = await newEntry.save();
    await db.disconnect();
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(500).json({ message: 'Something went wrong' });
  }
};
