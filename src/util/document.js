import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase';

export const createDocument = async ( documentName, documentPrice, documentDetail, documentImageUrl ) =>
{
	try
	{
		const productCollectionRefrence = collection( firebaseStore, 'products' );
		const documentRefrence = await addDoc( productCollectionRefrence, { documentName, documentPrice, documentDetail, documentImageUrl, tempId: 'temp' } );
		await updateDoc( doc( firebaseStore, 'products', documentRefrence.id ), {
			tempId: documentRefrence.id
		} )

	} catch ( error )
	{
		return {
			error: error.message
		};
	}
}; 