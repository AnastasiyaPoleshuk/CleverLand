export interface IGetBooks {
    issueYear: string,
    rating: number,
    title: string,
    authors: string[],
    image: IBookImage,
    categories: string [],
    id: number,
    booking: IBooking,
    delivery: IDelivery,
    histories: IHistories[],
}

export interface IGetBook {
 	id: number,
    title: string,
    rating: number,
    issueYear: string,
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    authors: string[],
    images: IBookImage[],
    categories: string[],
    comments: IBookComments[],
    booking: IBooking,
    delivery: IDelivery,
    histories: IHistories [],
}

export interface IError {
 	data: null;
    error: {
        status: number,
        name: string,
        message: string,
        details: object,
    }
}

export interface ICategories {
 	name: string,
	path: string,
   	id: number,
}

export interface IAuthRequest {
    identifier: string,
    password: string,
}

export interface IRegistrationRequest {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export interface IUpdateUserRequest {
    email?: string,
    login?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    avatar?: number,
}

export interface IResetPasswordRequest {
    password: string,
    passwordConfirmation: string,
    code: string,
}

export interface IUserResponse {
    jwt: string,
    user: IGetUser,
}

export interface ISendEmailResponse {
    ok: boolean,
}

export interface ICommentsRequest {
    data: ICommentsRequestData
}

export interface ICommentsResponse {
    data: ICommentsData;
    meta: object,
}

export interface IBookingRequest {
    data: IBookingRequestData,
}

export interface IBookingResponse {
    data: IBookingData;
    meta: object,
}

export interface IFullUserResponse {
    id: number,
    username: string,
    email: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: {
        id: number,
        name: string,
        description: string,
        type: string
    },
    comments: [
        {
            id: number,
            rating: number,
            text: null | string,
            bookId: number
        }
    ],
    avatar: string,
    booking: {
        id: number,
        order: boolean,
        dateOrder: string,
        book: IUserBookingBookInfo,
    },
    delivery: {
        id: number,
        handed: boolean,
        dateHandedFrom: string,
        dateHandedTo: string,
        book: IUserBookingBookInfo
    },
    history: {
        id: number,
        books: IUserBookingBookInfo[]
    }
}

// ============================================

export interface IBooking {
 	id: number,
    order: boolean,
    dateOrder: string,
    customerId: number,
	customerFirstName: string,
    customerLastName: string
}

export interface IDelivery {
 	id: number,
    handed: boolean,
    dateHandedFrom: string,
	dateHandedTo: string,
    recipientId: number,
	recipientFirstName: string,
    recipientLastName: string,
}

export interface IHistories {
 	id: number,
    userId: number,
}

export interface IBookImage {
    url: string
}

export interface IBookComments {
	id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: IBookCommentsUser,
}

export interface IBookCommentsUser {
    commentUserId: number,
    firstName: string,
    lastName: string,
    avatarUrl: string,
}

export interface IGetUser {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export interface ICommentsData {
    id: number,
    attributes: {
        rating: number,
        text: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

export interface ICommentsRequestData {
    rating: number,
    text: string,
    book: string,
    user: string
}


export interface IBookingRequestData {
    order: boolean,
    dateOrder: string,
    book: string,
    customer: string
}

export interface IBookingData {
    id: number,
    attributes: {
        order: boolean,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        dateOrder: string
    }

}

export interface IUserBookingBookInfo {
    id: number,
    title: string,
    rating: number,
    issueYear: string,
    authors: string[],
    image: null
}

