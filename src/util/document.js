import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase';

export const createDocument = async ( documentName, documentPrice, documentDetail ) =>
{
	try
	{
		const productCollectionRefrence = collection( firebaseStore, 'products' );
		const documentRefrence = await addDoc( productCollectionRefrence, { documentName, documentPrice, documentDetail, documentImageUrl: 'temp', tempId: 'temp', imageId: 'temp' } );
		await updateDoc( doc( firebaseStore, 'products', documentRefrence.id ), {
			tempId: documentRefrence.id
		} )
		return {
			tempId: documentRefrence.id
		}
	} catch ( error )
	{
		return {
			error: error.message
		};
	}
}; 

export const updateDocument = async ( documentId, documentImageUrl, imageId ) =>
{
	try
	{
		await updateDoc( doc( firebaseStore, 'products', documentId ), {
			documentImageUrl: documentImageUrl,
			imageId: imageId
		} );
	} catch ( error )
	{
		console.log( error );
	}
};