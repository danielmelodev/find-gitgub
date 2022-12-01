import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo-git.png';
import api from '../../services/api';

export default function Home() {
    const [login, setCep] = useState('');
    const [address, setAddress] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${login}`);
            

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite o login do Github válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite o login do Github');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setCep('');
    }
    
    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="text"
                        maxLength={25}
                        onChangeText={setCep}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o seu login do Github"
                        placeholderTextColor="#2F48D4"
                        value={login}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
                <AddressArea>
                    <Text>Login: {login}</Text>
                    //Não consegui inserir a imagem na aplicação
                    <Image source={{uri: `${address.avatar_url}`}} />
                    <Text>Nome do usuário: {address.name}</Text>
                    <Text>Bio: {address.bio}</Text>
                    <Text>Seguindo: {address.followers}</Text>
                    <Text>Repositórios: {address.public_repos}</Text>
                    <Text>Cidade: {address.location}</Text>
                    </AddressArea>
            }
        </Container>
    );
}