import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dropbox, DropboxOptions, DropboxResponse, files } from 'dropbox';


@Injectable()
export class DropboxService {

	private dropbox: Dropbox;

	constructor(private configService: ConfigService) {
		let opts: DropboxOptions = {
			accessToken: this.configService.get<string>('DROPBOX_API_KEY')
		};
		this.dropbox = new Dropbox(opts);
	}

	async copyFiles(files: (files.FileMetadataReference | files.FolderMetadataReference | files.DeletedMetadataReference)[]) {
		for (const file of files) {
			console.log(file.path_display);
			if (file['.tag'] === 'file') {
				const dlFileResponse = await this.dropbox.filesDownload({ path: file.path_display });
				const readStream: any = dlFileResponse.result;
				const fileBinary: any = await readStream.fileBinary;
				console.log(fileBinary);
			} else {
				// await this.listFilesDropbbox(file.path_display);
			}
		}
	}

	async listFilesDropbbox(path: string) {
		try {
			const response: DropboxResponse<files.ListFolderResult> = await this.dropbox.filesListFolder({ path });
			const files = response.result.entries;
			await this.copyFiles(files);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
