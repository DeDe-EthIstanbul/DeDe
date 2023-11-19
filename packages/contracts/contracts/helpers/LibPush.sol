// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IPUSHCommInterface } from "../interfaces/IPUSHCommInterface.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

library LibPush {
    function sendDeliveryRequestedNotification(IPUSHCommInterface push, uint bountyAmount) internal {
        push.sendNotification(
            0x888880D76B08Ee18A853bfA503f83ac558b108dc, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            address(this), // BROADCAST TO EVERYONE to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "1", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "New Delivery Request!", // this is notificaiton title
                        "+", // segregator
                        string.concat("Bounty: ", Strings.toString(bountyAmount), "ETH") // notification body
                    )
                )
            )
        );
    }

    function sendDeliveryPickedUpNotification(IPUSHCommInterface push, address sender) internal {
        push.sendNotification(
            0x888880D76B08Ee18A853bfA503f83ac558b108dc, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            sender, // BROADCAST TO delivery sender. to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Delivery Picked Up!", // this is notificaiton title
                        "+", // segregator
                        "You delivery was picked up" // notification body
                    )
                )
            )
        );
    }

    function sendDeliveryDroppedOffNotification(IPUSHCommInterface push, address sender) internal {
        push.sendNotification(
            0x888880D76B08Ee18A853bfA503f83ac558b108dc, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            sender, // BROADCAST TO delivery sender. to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Package at Destination!", // this is notificaiton title
                        "+", // segregator
                        "You delivery was dropped off at your destination!" // notification body
                    )
                )
            )
        );
    }

    function sendDeliveryConfirmedNotification(IPUSHCommInterface push, address courier, uint bountyAmount) internal {
        push.sendNotification(
            0x888880D76B08Ee18A853bfA503f83ac558b108dc, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            courier, // BROADCAST TO delivery courier. to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                    abi.encodePacked(
                        "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
                        "+", // segregator
                        "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
                        "+", // segregator
                        "Delivery Confirmed!", // this is notificaiton title
                        "+", // segregator
                        string.concat(Strings.toString(bountyAmount), " has been released to your account!") // notification body
                    )
                )
            )
        );
    }
}
