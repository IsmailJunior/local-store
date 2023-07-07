import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase';

export const getItems = async ( collectionRefrence, uid, subCollection ) =>
{
	try
	{
		const documentCollectionRefrence = collection( firebaseStore, collectionRefrence, uid, subCollection );
		const documentsSnapshot = await getDocs( documentCollectionRefrence );
		return {
			data: documentsSnapshot.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) )
		};
	} catch ( error )
	{
		return {
			error: error.message
		};
	}
}

export const getItem = async ( collectionRefrence, uid, subCollection, productId ) =>
{
	try
	{
		const documentCollectionRefrence = collection( firebaseStore, collectionRefrence, uid, subCollection );
		const documentRefrence = doc( documentCollectionRefrence, productId );
		const documentSnapshot = await getDoc( documentRefrence );
		return {
			data: documentSnapshot.data()
		};
	} catch ( error )
	{
		console.log( error.message );
	}
}
