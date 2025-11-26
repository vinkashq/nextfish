'use server';

import { firestore } from '@/firebase/server';
import { Model } from '@/types/ai/chat';
import { revalidatePath } from 'next/cache';

const COLLECTION_NAME = 'chatbots';

export async function listChatbots(): Promise<Model[]> {
  try {
    const snapshot = await firestore.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Model[];
  } catch (error) {
    console.error('Error listing chatbots:', error);
    return [];
  }
}

export async function addChatbot(chatbot: Omit<Model, 'id'>): Promise<Model | null> {
  try {
    const docRef = await firestore.collection(COLLECTION_NAME).add(chatbot);
    revalidatePath('/admin/settings/chatbots');
    return {
      id: docRef.id,
      ...chatbot,
    };
  } catch (error) {
    console.error('Error adding chatbot:', error);
    return null;
  }
}

export async function updateChatbot(id: string, chatbot: Partial<Model>): Promise<void> {
  try {
    await firestore.collection(COLLECTION_NAME).doc(id).update(chatbot);
    revalidatePath('/admin/settings/chatbots');
  } catch (error) {
    console.error('Error updating chatbot:', error);
    throw error;
  }
}

export async function deleteChatbot(id: string): Promise<void> {
  try {
    await firestore.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath('/admin/settings/chatbots');
  } catch (error) {
    console.error('Error deleting chatbot:', error);
    throw error;
  }
}
