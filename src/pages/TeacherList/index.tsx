import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import styles from './styles'
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';

import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

export default function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFilterSubmit() {
        const list = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeachers(list.data);
    }

    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}>
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Materia</Text>
                    <TextInput style={styles.input} 
                        value={subject} 
                        onChangeText={text => setSubject(text)} 
                        placeholder="Qual a materia?" 
                        placeholderTextColor="#c1bccc" />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Da da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekday(text)}
                                placeholder="Qual o dia?" 
                                placeholderTextColor="#c1bccc"></TextInput>
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput style={styles.input} 
                                value={time} 
                                onChangeText={text => setTime(text)} 
                                placeholder="Qual horário?" 
                                placeholderTextColor="#c1bccc"></TextInput>
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>

            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>
                {teachers.map((teacher: Teacher) => <TeacherItem key={teachers.id} teacher={teacher} />)}

            </ScrollView>
        </View>
    );
}