export const adminMenu = [
    { //người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            // {
            //     name: 'menu.admin.manage-admin',link: '/system/user-admin'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/manage-user'
            },
            
        ]
    },
    { //phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //Cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lí kế hoạch khám bệnh bác sĩ

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
            { //Quản lí bệnh nhân của bác sĩ

                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            }
        ]
    }
];