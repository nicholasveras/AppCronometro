import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;

export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('INICIAR!');
  const [ultimo, setUltimo] = useState(null);

  function iniciar(){

    if(timer !== null){
      //Aqui vai parar o timer
       clearInterval(timer);
       timer = null;
       setBotao('INICIAR!')
    }else {
      // comecar a girar o timer
      timer = setInterval(()=>{
        segundos++;

        if(segundos == 60){
          segundos = 0;
          minutos++; 
        }

        if(minutos == 60){
          minutos = 0;
          horas++;
        }

        let format =
        (horas < 10 ? '0' + horas : horas) + ':'
        + (minutos < 10 ? '0' + minutos : minutos) + ':'
        + (segundos < 10 ? '0' + segundos : segundos);
        
        setNumero(format); 

      }, 1000);
      setBotao('PARAR');
    }
  }

  function limpar(){
    if(timer !== null){
      //parar o timer
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    segundos = 0;
    minutos = 0;
    horas = 0;
    setBotao('INICIAR!')
  }

  return (
    <View style={styles.container}>

    <StatusBar style="auto" />

      <Image
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}> {numero} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          { ultimo ? 'Ultimo tempo:' + ultimo : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
    marginBottom: 40, // Add margin at the bottom to separate from the next section
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 10,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    marginBottom: 25, // Add margin at the top to separate from the previous section
  },
  textoCorrida: {
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic'
  }
});
