import { getDocs, collection, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseStore } from '../config/firebase'

export const getItems = async ( collectionRefrence ) =>
{
	try
	{
		const documentCollectionRefrence = collection( firebaseStore, collectionRefrence );
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

export const getItem = async ( collectionRefrence, productId ) =>
{
	try
	{
		const documentCollectionRefrence = collection( firebaseStore, collectionRefrence );
		const documentRefrence = doc( documentCollectionRefrence, productId );
		const documentSnapshot = await getDoc( documentRefrence );
		return {
			data: documentSnapshot?.data()
		};
	} catch ( error )
	{
		console.log( error.message );
	}
}

export const deleteItem = async ( collectionReference, productId ) =>
{
	try
	{
		const documentCollectionRefrence = collection( firebaseStore, collectionReference );
		const documentRefrence = doc( documentCollectionRefrence, productId );
		await deleteDoc( documentRefrence );
	} catch ( error )
	{
		console.log( error.message );
	}
};
