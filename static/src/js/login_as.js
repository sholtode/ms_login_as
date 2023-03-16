/** @odoo-module **/
import { Dialog } from "@web/core/dialog/dialog";
import { registry } from "@web/core/registry";
import { _lt } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import rpc from "web.rpc";

class LoginAsDialog extends Dialog {
    setup() {
        super.setup(...arguments);
        this.orm = useService("orm");
        this.user = useService("user");
    }

    async willStart() {
        this.users = await this.orm.call("res.users", "search_read", [[['active', '=', 'true']], ['id', 'name']], {});
        const { _t } = this.env;
        this.buttonMessage = _t("Login als Benutzer");

    }

    loginAsUser() {
        const user_id = $('#loginDialogProject_id option:selected').val()
        window.open('web/login_as?uid=' + user_id, "_self");
        this.close();
    }
}

LoginAsDialog.bodyTemplate = "ms_login_as.loginDialog"
LoginAsDialog.footerTemplate = "ms_login_as.loginDialogFooter"
LoginAsDialog.title = _lt("Login as...")

export function loginAsItem(env) {
    return {
        type: "item",
        id: "login_as",
        description: env._t("Login As..."),
        callback: () => {
            env.services.dialog.add(LoginAsDialog);
        },
        sequence: 69,
    };
}

const { core } = owl;
const loginAsService = {
    dependencies: ["orm"],
    start(env, { orm }) {
        const bus = new core.EventBus();

        function updateMenu() {
            rpc.query({
                model: "res.users",
                method: "has_group",
                args: ['ms_login_as.group_login_as'],
                kwargs: {},
            }).then(function (data) {
                if(data == true){
                    registry
                        .category("user_menuitems")
                        .add("odoo_login_as", loginAsItem);
                }
            });

        }
        env.bus.on("WEB_CLIENT_READY", null, updateMenu);
    },
}

registry.category("services").add("ms_login_as", loginAsService);


