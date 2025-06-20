sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/fe/demo/equipment/test/integration/FirstJourney',
		'sap/fe/demo/equipment/test/integration/pages/EquipmentList',
		'sap/fe/demo/equipment/test/integration/pages/EquipmentObjectPage',
		'sap/fe/demo/equipment/test/integration/pages/MaintenanceTaskObjectPage'
    ],
    function(JourneyRunner, opaJourney, EquipmentList, EquipmentObjectPage, MaintenanceTaskObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/fe/demo/equipment') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEquipmentList: EquipmentList,
					onTheEquipmentObjectPage: EquipmentObjectPage,
					onTheMaintenanceTaskObjectPage: MaintenanceTaskObjectPage
                }
            },
            opaJourney.run
        );
    }
);