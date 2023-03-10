import paho.mqtt.client as mqtt
import streamlit as st

# Set up MQTT client
mqtt_broker = "mqtt.eclipse.org"
mqtt_topic = "led/control"
mqtt_client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code " + str(rc))
    mqtt_client.subscribe(mqtt_topic)

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))

def send_mqtt_message(message):
    mqtt_client.publish(mqtt_topic, message)

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect(mqtt_broker)

# Streamlit app
st.title("LED Control")

led_on = st.button("Turn LED on")
led_off = st.button("Turn LED off")

if led_on:
    send_mqtt_message("on")
if led_off:
    send_mqtt_message("off")
