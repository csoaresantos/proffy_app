import React, { useState } from 'react';
import TeacherList from '../../TeacherList';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../../assets/images/icons/whatsapp.png'

export interface Teacher{
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps{
    teacher: Teacher,
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ( { teacher, favorited }) => {
    const [ isFavorited, setIsFavorited ] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArrays = [];

        if(favorites) {
            const favoritesArrays = JSON.parse(favorites);
        }

        if(isFavorited) {
            const favoriteIndex = favoritesArrays.findIndex((item: Teacher) => item.id === teacher.id);
            favoritesArrays.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {


            favoritesArrays.push(teacher.id);
            setIsFavorited(true);
        }
        AsyncStorage.setItem('favorites', JSON.stringify(favoritesArrays));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{uri: teacher.avatar }} />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}    
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {' '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited : {} ]} onPress={handleToggleFavorite}>
                        { /* <Image source={heartOutlineIcon} /> */}
                        { isFavorited 
                            ? <Image source={unfavoriteIcon} /> 
                            : <Image source={heartOutlineIcon} />}
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}
export default TeacherItem;