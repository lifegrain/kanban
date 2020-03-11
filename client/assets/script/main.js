const server = `http://localhost:3000`

var app = new Vue({
    el: `#app`,
    methods: {
        login() {
            this.alert.status = false

            axios({
                url: `${server}/users/login`,
                method: `post`,
                data: {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                }
            })
                .then(data => {
                    this.loginForm.email = ``
                    this.loginForm.password = ``

                    localStorage.token = data.data.token

                    this.view = `main`
                })
                .catch(err => {
                    this.alert.msg = err.response.data.status_message
                    this.alert.code = err.response.data.status_code

                    this.error()
                })
        },
        error() {
            this.alert.status = true
        }
    },
    created() {
        if (localStorage.token) {
            this.view = `main`
        } else {
            this.view = `login`
        }
    },
    mounted() {
        this.mounted = `display: block;`
    },
    computed: {
        alertMsg() {
            return this.alert.msg.join(`, `)
        }
    },
    data: {
        mounted: ``,
        alert: {
            status: false,
            code: null,
            msg: []
        },
        view: null,
        loginForm: {
            email: ``,
            password: ``,
        },
        category: {
            Backlog: [`
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum augue sed neque commodo, sagittis tempus elit dictum. 
            Pellentesque non justo massa. In ipsum mi, dapibus ac dolor et, 
            fermentum luctus nulla. Mauris molestie augue vel velit malesuada mattis. Aliquam dignissim quam eget condimentum porttitor. 
            Aenean arcu dui, aliquet in tortor ac, fermentum faucibus turpis. 
            Ut et ipsum non dui vulputate mattis. Proin lobortis lacus eget massa ultrices, 
            eu fermentum nunc imperdiet. Sed ac metus mi. Aliquam convallis lectus justo, a congue metus egestas sollicitudin. 
            Donec tempus egestas faucibus. Proin vitae tellus leo.
            `, `
            Nam vulputate placerat elit eget porttitor. Integer lacus tellus, gravida eu diam id,
            sagittis sodales risus. Cras vitae ultricies justo, eget volutpat turpis. Integer luctus
            augue sit amet convallis maximus. Donec facilisis ipsum eu dapibus rhoncus. Etiam nec augue
            pulvinar, pellentesque massa et, efficitur mi.
            `, `
            Donec consequat odio felis, eget sodales turpis tempus tincidunt. Integer pellentesque
            tortor est, vitae posuere dolor sodales varius. Fusce sagittis rutrum dictum. Donec blandit
            tellus at leo cursus congue. Integer sed venenatis mauris. Fusce suscipit leo id dui aliquam
            dictum. Mauris sed mi imperdiet, ultricies est vestibulum, cursus erat.
            `, `
            Donec tellus ante, egestas eu lectus non, commodo laoreet justo. Morbi at viverra nunc.
            Maecenas non magna quis nibh pretium varius nec quis mi. Vivamus non viverra orci. Mauris
            leo justo, condimentum vitae lectus luctus, gravida feugiat nisi. Cras et leo risus.
            Phasellus eros ante, interdum ultricies sem non, tincidunt placerat mi. Fusce convallis elit
            nec facilisis sollicitudin. Pellentesque maximus maximus luctus. Integer pellentesque
            fermentum urna, non ultricies diam rutrum eget. Maecenas varius interdum sapien at
            tristique. In ac placerat felis. Morbi facilisis sapien sagittis malesuada sodales. Ut vel
            lacinia felis. Nam tortor est, efficitur a accumsan ac, tincidunt eu eros.

            Duis enim tortor, pulvinar at sodales ac, dignissim in mi. Cras imperdiet orci a justo
            fermentum, eget imperdiet velit rutrum. Integer sed augue condimentum, consectetur tortor
            eu, egestas quam.
            `, `
            Praesent a iaculis turpis, eget ultrices neque. Sed efficitur turpis mi. Duis mattis nibh in
            arcu rutrum iaculis. Cras eget arcu sem. Integer pellentesque a dolor eget luctus. Aliquam
            euismod magna in quam ultricies, at interdum ex pretium. Proin pharetra, leo vel aliquet
            faucibus, turpis purus sollicitudin justo, iaculis finibus velit neque et dolor.
            Pellentesque fermentum enim velit, eu varius libero laoreet sit amet. Cras ante dui, varius
            vitae viverra porta, aliquam non ligula.
            `, `
            Quisque molestie eu arcu dignissim rutrum. Curabitur pellentesque turpis vitae est tempus
            fringilla. Aliquam erat volutpat. Duis a nisi augue. Proin accumsan, ex eu tincidunt
            rhoncus, felis felis pulvinar neque, at convallis odio quam nec quam. Donec non dui quis
            libero elementum blandit nec vitae nisi. Aenean justo est, lobortis ut massa quis, tristique
            posuere ligula. Curabitur volutpat nulla sed rhoncus aliquet. Ut massa augue, ultrices sit
            amet diam a, scelerisque venenatis justo. Vestibulum vel dui vel sapien tempus dictum. Cras
            imperdiet arcu et felis ultrices, et hendrerit metus placerat. Sed consequat tortor nec
            turpis convallis malesuada.
            `] ,
            Todo: [`Mexican President Andrés Manuel López Obrador keeps sending messages that 
            show an astounding lack of support for the victims of femicide.`,
            `A recent ugly spat on a NEO TV Channel talk show exposes the prevailing misbehaviour, 
            sexism, misogyny and abusive language targeting women panellists and anchors in Pakistan media.`,
            `Around Latin America, more than a million women marched against gender violence.`],
            Done: [`Apple`, `Pineapple`, `Applepen`],
            Completed: [`test1`,`test2`,`test3`,`test4`,`test5`,`test6`,`test7`,`test8`,`test9`,`test10`]
        }
    }
})