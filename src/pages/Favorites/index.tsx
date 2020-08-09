import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../components/PageHeader';

export default function Favorites() {
    return (
        <View styles={styles.container}>
            <PageHeader title="Meus proffys favorítos" />
        </View>
    );
}