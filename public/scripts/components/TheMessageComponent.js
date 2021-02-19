export default {
    props: ['msg', 'socketid'],

    template:
    //is this my message or sbd else message?
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h4>{{msg.message.name}} says:</h4>
        <p>{{msg.message.content}}</p>
    </article>
    `,

    data: function(){
        return{
            //is this my message or sbd else message?
            matchedID: this.socketid == this.msg.id
        }
    }
}