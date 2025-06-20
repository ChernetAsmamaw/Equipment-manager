sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/ui/layout/form/SimpleForm"
], function (MessageToast, MessageBox, Dialog, Button, Label, Select, Item, SimpleForm) {
    'use strict';
    return {
        onWorkflowButtonPress: function (oBindingContext, aSelectedContexts, oExtension) {
            const uniqueStatuses = new Set(aSelectedContexts.map(context => context.getObject().Status));
            const aStatusOptions = [
                { 
                  key: "reopenTask", 
                  text: "Open", 
                  enabled: uniqueStatuses.has('COMPLETED') 
                },
                { 
                  key: "startProgress", 
                  text: "In Progress", 
                  enabled: uniqueStatuses.has('OPEN') 
                },
                { 
                  key: "closeTask",
                  text: "Complete", 
                  enabled: uniqueStatuses.has('OPEN') || uniqueStatuses.has('IN_PROGRES') 
                }
              ];
            
            const oDialog = new Dialog({
                title: "Change Task Status",
                content: [
                    new SimpleForm({
                        content: [
                            new Label({ text: "New Status", required: true }),
                            new Select("statusSelect", {
                                items: aStatusOptions.map(opt =>
                                    new Item({ key: opt.key, text: opt.text, enabled: opt.enabled })
                                )
                            })
                        ]
                    })
                ],
                beginButton: new Button({
                    text: "Confirm",
                    type: "Emphasized",
                    press: async function () {
                        const sSelectedActionKey = sap.ui.getCore().byId("statusSelect").getSelectedKey();
                        if (!sSelectedActionKey) {
                            MessageBox.error("Please select a status from the dropdown.");
                            return;
                        }
                        
                        // Update the namespace to match your service
                        const sNamespace = "com.sap.gateway.srvd.zsd_equipment_ca.v0001";
                        const sQualifiedActionName = `${sNamespace}.${sSelectedActionKey}`;
                        
                        oDialog.close();
                        
                        let successCount = 0;
                        for (const oContext of aSelectedContexts) {
                            try {
                                const oActionBinding = oContext.getModel().bindContext(`${sQualifiedActionName}(...)`, oContext);
                                await oActionBinding.execute();
                                successCount++;
                            } catch (oError) {
                                MessageBox.error(oError.message);
                                return;
                            }
                        }
                        
                        if (successCount > 0) {
                            MessageToast.show(`${successCount} task(s) updated successfully.`);
                            // Refresh the table
                            try {
                                const oTable = oExtension.byId("fe::table::_MaintenanceTasks::LineItem");
                                if (oTable && oTable.getBinding && oTable.getBinding("items")) {
                                    oTable.getBinding("items").refresh();
                                } else {
                                    console.warn("Table binding not found, performing full model refresh.");
                                    oExtension.refresh();
                                }
                            } catch (oError) {
                                console.error("Error during table refresh. Falling back to model refresh.", oError);
                                oExtension.refresh();
                            }
                        }
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: () => oDialog.close()
                }),
                afterClose: () => oDialog.destroy()
            });
            
            oDialog.open();
        }
    };
});