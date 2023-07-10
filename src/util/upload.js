import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { firebaseStorage } from '../config/firebase'

export const uploadFile = async ( documentFile ) =>
{
	try
	{
		const filePath = `products/${ uuid() }`;
		const documentFileRefrence = ref( firebaseStorage, filePath );
		await uploadBytes( documentFileRefrence, documentFile );
		const documentFileUrl = await getDownloadURL( documentFileRefrence );
		return {
			url: documentFileUrl
		};
	} catch ( error )
	{
		return {
			error: error.messeage
		};
	}
};