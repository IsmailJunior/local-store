import { collection, addDoc, doc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase';

export const createDocument = async ( userUid, documentName, documentPrice, documentDetail, documentImageUrl ) =>
{
	try
	{
		const userDocuemntRefrence = doc( firebaseStore, 'user', userUid );
		const productCollectionRefrence = collection( userDocuemntRefrence, 'products' );
		await addDoc( productCollectionRefrence, { documentName, documentPrice, documentDetail, documentImageUrl } );
	} catch ( error )
	{
		return {
			error: error.message
		};
	}
}; 