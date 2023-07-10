import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { firebaseStorage } from '../config/firebase'

export const uploadFile = async ( tempId, documentFile ) =>
{
	try
	{
		const filePath = `${ tempId }/${ uuid() }`;
		const documentFileRefrence = ref( firebaseStorage, filePath );
		const fileRefrence = await uploadBytes( documentFileRefrence, documentFile );
		const documentFileUrl = await getDownloadURL( documentFileRefrence );
		return {
			url: documentFileUrl,
			id: fileRefrence
		};
	} catch ( error )
	{
		return {
			error: error.messeage
		};
	}
};

export const deleteFile = async ( fileId, tempId ) =>
{
	try
	{
		const fileRefrence = ref( firebaseStorage, `${ fileId }/${ tempId }` );
		await deleteObject( fileRefrence );
	} catch ( error )
	{
		console.log( error.messeage );
	}
};