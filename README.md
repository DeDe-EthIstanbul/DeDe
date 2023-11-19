<p align="center">
<img src="./docs/Logo.png" width=400/>

<p align="center">
📦 Your Decentralized Delivery Network

🖌️ UI/UX Design: 
<https://www.figma.com/file/8v6q8eWYWX0326q0eJ7qx7>

💡 Live Site: 
<https://dede-seven.vercel.app/>

## Motivation

DeDe (Decentralized Delivery Network) is designed to improve the traditional delivery service landscape. It addresses critical issues like high delivery costs, tracking inaccuracies, limited service reach, and unfair courier compensation. By leveraging blockchain technology, DeDe ensures direct transactions between customers and couriers, leading to fairer compensation and reduced overall costs. The platform employs Proof of Interaction using ARX’s proprietary technolofy for real-time, accurate tracking, enhancing customer trust and courier accountability. Additionally, DeDe introduces a unique scoring system, the DeDe Score, based on courier performance and sender reliability, fostering trust within the network. The platform also features an anonymous messaging system for secure communication among participants. DeDe is not just a delivery service; it's a comprehensive ecosystem designed to make deliveries more efficient, transparent, and fair for all stakeholders. 

## Video Demo

[![Watch the video](https://img.youtube.com/vi/qJX8pv7H0ac/hqdefault.jpg)](https://www.youtube.com/embed/qJX8pv7H0ac)

## Deck

![2](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/0bd707f5-6909-4f62-baa4-6b2cbe9b1e78)
![3](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/7132d002-40db-42bc-9c31-db23de75d8a7)
![4](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/263347d3-9896-4c3b-b8d7-20ffd675dd03)
![5](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/609030fc-96ee-4fe3-80ef-bcdf81c2393e)
![6](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/ccf4a748-8bc3-4dc1-a4b7-f7c071a5451b)
![7](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/e58fcb84-b9fb-456d-ae0e-d1a64fb61664)
![8](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/65f5d5fd-fce9-4735-8940-302113be8b4b)
![9](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/c04874d0-1610-41b6-9fc5-252b4565f1b4)
![10](https://github.com/DeDe-EthIstanbul/DeDe/assets/23635326/dec92f6e-a2b9-4dd4-9a0f-e4d8f031f40c)


## Deployments

see [deployments](./packages/contracts/deployments/)

## Integration

### ARX

- Unique NFC identifiers used to prove physical presence of couriers at delivery locations.

### Push

- Notify users when a delivery request is made
- Notify sender when a delivery is picked up
- Notify sender when a delivery has reached the destination
- Notify courier when a delivery payment is released after confirmation by the recepient

### Waku

- Communication between couriers and senders.
- Notification when a package has moved.

### Metamask Snap

- Integration with PUSH where a Notification is issued when a parcel arrived at a destination.

### Wallet Connect

- Integrated with Web3Inbox to send delivery notifications to senders.
