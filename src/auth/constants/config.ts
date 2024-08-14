import { ConfigService } from '@nestjs/config';

export const config = (configService: ConfigService) => ({
  jwtSecretKey:
    configService.get<string>('JWT_SECRET_KEY') || 'default_secret_key',
  jwtExpirationTime: '24h',
  databaseUrl:
    configService.get<string>('DATABASE_URL') ||
    'postgresql://postgres:hfswBkhUiCkHctUXPTPNHmwOMezIukpk@postgres.railway.internal:5432/railway',
});
