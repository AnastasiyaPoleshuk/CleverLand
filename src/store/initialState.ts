export const initialState = {
    books: [],
    book: {
        id: 0,
        title: '',
        rating: 0,
        issueYear: '',
        description: '',
        publish: '',
        pages: '',
        cover: '',
        weight: '',
        format: '',
        ISBN: '',
        producer: '',
        authors: [],
        images: [
            {
                url: ''
            },
        ],
        categories: ['i', 'p'],
        comments: [
            {
                id: 0,
                rating: 0,
                text: '',
                createdAt: '',
                user: {
                    commentUser: 0,
                    firstName: '',
                    lastName: '',
                    avatarUrl: ''
                }
            },
        ],
        booking: {
            id: 0,
            order: false,
            dateOrder: '',
            customerId: 0,
            customerFirstName: '',
            customerLastName: ''
        },
        delivery: {
            id: 0,
            handed: false,
            dateHandedFrom: '',
            dateHandedTo: '',
            recipientId: 0,
            recipientFirstName: '',
            recipientLastName: ''
        },
        histories: [
            {
                id: 0,
                userId: 0
            },
        ]
    },
    error: {
        data: null,
        error: {
            status: 200,
            name: '',
            message: '',
            details: {}
        },
    },
    categories: {
        categories: []
    },
    user: {
        jwt: '',
        user: {
            id: 0,
            username: '',
            email: '',
            provider: '',
            confirmed: false,
            blocked: false,
            createdAt: '',
            updatedAt: '',
            firstName: '',
            lastName: '',
            phone: '',
        },
    },
    registrationRequest: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    },
    authRequest: {
        username: '',
        password: '',
    },
    comments: {
        data: {
            id: 0,
            attributes: {
                rating: 0,
                text: '',
                createdAt: '',
                updatedAt: '',
                publishedAt: ''
            }
        },
        meta: {}
    },
    booking: {
        data: {
            id: 0,
            attributes: {
                order: false,
                createdAt: '',
                updatedAt: '',
                publishedAt: '',
                dateOrder: ''
            }
        },
        meta: {}
    },
    alert: {
        isError: false,
        text: '',
    },
    isAuth: false,
    isRegistration: false,
    isLoading: false,
    isError: false,
    SendEmailSuccess: false,
    isChangePasswordSuccess: false,
    isCommentsSuccess: false,
    isBookingSuccess: false,

}
