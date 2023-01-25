import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class DriveService {
	private drive: any;

	constructor(private configService: ConfigService) {
		const keyFile: string = this.configService.get<string>('GOOGLE_KEY_FILE_PATH');
		const optsCred = {
			keyFile,
			scopes: ['https://www.googleapis.com/auth/drive'],
		};

		console.log(optsCred);
		const auth = new google.auth.GoogleAuth(optsCred);
		this.drive = google.drive({ version: 'v3', auth });
	}

	async createFolder(name: string): Promise<void> {
		const fileMetadata = {
			name: name,
			mimeType: 'application/vnd.google-apps.folder',
			parents: ['1AwGpkBmU9RJXeCGGRGIv-gNzzfyQXBq3']
		};


		this.drive.files.create({
			resource: fileMetadata,
			fields: 'id',
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.error(err);
			});
	}
}

