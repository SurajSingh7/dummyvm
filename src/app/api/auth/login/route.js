import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
 console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
}
