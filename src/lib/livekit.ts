import * as jose from 'jose';

export async function generateLiveKitToken(roomName: string, participantName: string) {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("LiveKit API Key veya Secret eksik.");
  }

  const secret = new TextEncoder().encode(apiSecret);
  
  const jwt = await new jose.SignJWT({
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    }
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(apiKey)
    .setSubject(participantName)
    .setExpirationTime('2h')
    .setNotBefore('0s')
    .sign(secret);

  return jwt;
}
