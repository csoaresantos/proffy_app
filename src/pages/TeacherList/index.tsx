import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import styles from './styles'
import PageHeader from '../components/PageHeader';
import TeacherItem from '../components/TeacherItem';

export default function TeacherList() {
    const [ isFiltersVisible, setIsFiltersVisible] = useState(false);
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis">
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Materia</Text>
                    <TextInput style={styles.input} placeholder="Qual a materia?" placeholderTextColor="#c1bccc" />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Da da semana</Text>
                            <TextInput style={styles.input} placeholder="Qual o dia?" placeholderTextColor="#c1bccc"></TextInput>
                        </View>
                   

                        
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput style={styles.input} placeholder="Qual horário?" placeholderTextColor="#c1bccc"></TextInput>
                        </View>
                    </View>
                </View>)}
            </PageHeader>
            
            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>
        </View>
    );
}