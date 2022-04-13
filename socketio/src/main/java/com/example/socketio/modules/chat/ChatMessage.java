package com.example.socketio.modules.chat;

// 현재 예제에서는 사용하지 않는 클래스
public class ChatMessage {

    private String userName;
    private String message;

    public ChatMessage() {
    }

    public ChatMessage(String userName, String message) {
        super();
        this.userName = userName;
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
