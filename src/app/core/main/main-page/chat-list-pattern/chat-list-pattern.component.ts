import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import {TuiAutoColorModule, TuiAvatarModule, TuiAvatarStackModule} from '@taiga-ui/experimental';
import { TuiScrollbarModule } from '@taiga-ui/core';

@Component({
  selector: 'app-chat-list-pattern',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiSvgModule,
    TuiAvatarStackModule,
    TuiAutoColorModule,
    TuiScrollbarModule
  ],
  templateUrl: './chat-list-pattern.component.html',
  styleUrl: './chat-list-pattern.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChatListPatternComponent implements OnInit{
  users = [
    {
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },{
      icon: 'PN',
      name: 'Platon Nikitin',
      message: 'Hi, do you go to the swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SA',
      name: 'Sofia Aulova',
      message: 'We need to finish this project',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'SS',
      name: 'Salim Shagaev',
      message: 'Hi, are you going swimming today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AR',
      name: 'Alex Rose',
      message: 'Yes, its a difficult day today',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JH',
      name: 'John Harrison',
      message: 'Hey, how was your weekend? Did you do anything fun?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'KL',
      name: 'Katie Lee',
      message: 'Hi there! Just wanted to remind you about our meeting tomorrow at 10 AM. See you there!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'MW',
      name: 'Michael Williams',
      message: 'Good morning! Hope you have a great day ahead!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EB',
      name: 'Emily Brown',
      message: 'Hey, I saw your email about the project. Let\'s discuss it further during our call today.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'LS',
      name: 'Laura Smith',
      message: 'Hi! Just wanted to check in and see how you\'re doing. Let me know if you need anything!',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'AT',
      name: 'Anna Thompson',
      message: 'Hey, have you seen the latest episode of that show?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'BD',
      name: 'Brian Davis',
      message: 'Hi, how are you feeling today? Everything alright?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'CC',
      name: 'Catherine Clark',
      message: 'Hey there, did you get a chance to look at the new proposal?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'DM',
      name: 'David Miller',
      message: 'Hi, just wanted to remind you about the deadline for the report.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'EL',
      name: 'Emma Lewis',
      message: 'Hey! What do you think about the new project idea?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'FG',
      name: 'Frank Green',
      message: 'Hi, are you available for a quick chat later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'GG',
      name: 'Grace Garcia',
      message: 'Hey, do you have any plans for the weekend?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'HS',
      name: 'Henry Scott',
      message: 'Hi there! How did your presentation go yesterday?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'IM',
      name: 'Isabella Martinez',
      message: 'Hey, can you help me with this task later today?',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
    {
      icon: 'JP',
      name: 'James Parker',
      message: 'Hi, just wanted to check in and see how you\'re doing.',
      time: this.getRandomTime(),
      avatarColor: this.generateRandomColor(),
      checkread: this.generateRandomImage()
    },
  ];

  ngOnInit(): void {
  }
  private getRandomTime(): string {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  generateRandomColor(): string {
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const h = getRandomInt(0, 360); // случайный тон
    const s = getRandomInt(75, 100); // насыщенность от 75% до 100%
    const l = getRandomInt(70, 90); // светлота от 70% до 90%

    return `hsl(${h}, ${s}%, ${l}%)`; // возвращаем цвет в формате HSL
}
  generateRandomImage(): string {
    return Math.random() < 0.5 ? 'checkmes.svg' : 'checkread.svg';
  }

  selectedUser: any;

  selectUser(user: any) {
    this.selectedUser = user;
    console.log("pick user =>", user);
  }
}
