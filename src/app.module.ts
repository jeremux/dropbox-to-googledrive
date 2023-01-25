import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DropboxService } from './dropbox/dropbox.service';
import { DriveService } from './drive/drive.service';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('development', 'production').default('development'),
				APP_PORT: Joi.number().default(3000),
				DROPBOX_API_KEY: Joi.string().required(),
				GOOGLE_KEY_FILE_PATH: Joi.string().required()
			}),
			isGlobal: true,
			envFilePath: '.env'
		})
	],
	controllers: [AppController],
	providers: [AppService, DropboxService, DriveService],
})
export class AppModule { }