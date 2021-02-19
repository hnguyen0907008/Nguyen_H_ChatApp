import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired!');

    //load the socket library and make connection to backend
    //ref site: https://socket.io/get-started/chat/
    const socket = io();

    //messenger service event handling -> incoming from the manager
    function setUserId({sID, nickname, message}) {
        //incoming connected event with data
       //debugger;
        vm.socketID = sID;
    }

    function appendMessage(nickname, message){
        vm.messages.push(message);
        vm.nicknames.push(nickname);
    }

    const vm = new Vue({
        //no ; inside objects
        data: {
            messages: [],
            nickname: "",
            socketID: "",
            message: "",
        },

        created: function(){
            console.log("it's alive!!");
        },

        methods: {
            //actually make the chat work
            dispatchMessage(){
                socket.emit('chatmessage', {content: this.message, name: this.nickname});
                this.nickname="";
                this.message="";
            }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    //connect to app.js
    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMessage);
})();

