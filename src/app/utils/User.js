export const getUserData = (user) => ({
    uuid: `uuid_${user?.username}_${user?.email}`,
    from: "custom-db",
    role: 'admin',
    data: {
            displayName: `${user?.username}`,
        photoURL: "assets/images/logo/icmlogo.png",
            email: user?.email,
        settings: {
            layout: {},
            theme: {}
        },
        shortcuts: [],
        userData: user
    },
})