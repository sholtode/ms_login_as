# -*- coding: utf-8 -*-
{
    'name': "MS Login As",
    'summary': """Login as an other User""",
    'description': """**based on bobbies_login_as for Odoo 14.0**
        
- \(C) 2021 Bobbies (<https://www.bobbies.com>)
- License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl)
- https://apps.odoo.com/apps/modules/14.0/bobbies_login_as/
        
    """,
    'author': "Sholto Douglas",
    'license': 'LGPL-3',
    'website': "https://ms-systems.eu/",
    'category': 'Productivity',
    'version': '15.0.1.0.0',
    'application': False,
    'depends': [
        'web',
    ],
    'data': [
        'security/res_groups.xml'
    ],
    "assets": {
        "web.assets_backend": [
            '/ms_login_as/static/src/js/login_as.js',
        ],
        'web.assets_qweb': [
            '/ms_login_as/static/src/xml/dialog_item.xml',
        ],
    },

}
