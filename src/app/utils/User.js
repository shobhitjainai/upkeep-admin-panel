export const getUserData = (user) => ({
    uuid: `uuid_${user?.name}_${user?.email}`,
    from: "custom-db",
    role: 'admin',
    data: {
        displayName: `${user?.name}`,
        photoURL: "assets/images/logo/icmlogo.png",
        email: user?.email,
        settings: {
            layout: {},
            theme: {}
        },
        shortcuts: []
    },
})