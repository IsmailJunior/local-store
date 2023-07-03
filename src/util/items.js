import { getDocs, collection } from 'firebase/firestore';
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

