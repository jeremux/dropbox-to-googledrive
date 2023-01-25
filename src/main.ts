import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DropboxService } from './dropbox/dropbox.service';
import { DriveService } from './drive/drive.service';
dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const dropboxService = app.get(DropboxService);
	const googleDriveService = app.get(DriveService);
	dropboxService.listFilesDropbbox('/test');
	await googleDriveService.createFolder("underNest");
}
bootstrap();
