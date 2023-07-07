import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase';

export const createDocument = async ( userUid, documentName, documentPrice, documentDetail, documentImageUrl, tempId ) =>
{
	try
	{
		const userDocuemntRefrence = doc( firebaseStore, 'user', userUid );
		const productCollectionRefrence = collection( userDocuemntRefrence, 'products' );
		const documentRefrence = await addDoc( productCollectionRefrence, { documentName, documentPrice, documentDetail, documentImageUrl, tempId } );
		await updateDoc( doc( firebaseStore, 'user', userUid, 'products', documentRefrence.id ), {
			tempId: documentRefrence.id
		} )

	} catch ( error )
	{
		return {
			error: error.message
		};
	}
}; 