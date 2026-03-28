import React, { useEffect, useState } from 'react'
import './Chatbot.css'
import { GoogleGenAI } from '@google/genai';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const Chatbot = () => {
    const { id } = useParams()
    const counsellor_id=id
    const storedUser = JSON.parse(localStorage.getItem('user'))

    const [counselor, setCounselor] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [pendingBooking, setPendingBooking] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookingStep, setBookingStep] = useState('idle');

    console.log("Counsellor ID:", counsellor_id);
    const ai = new GoogleGenAI({apiKey: "AIzaSyDLBp8OvV0XB9hAUAqIQ52a1HslLSWhQXY"})
    const createId = () =>`${Date.now()}-${Math.random().toString(36).slice(2)}`

    const createMessage = (text, sender = 'bot') => ({
        id: createId(),
        text,
        sender,
        time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
        })
    })

    const addBotMessage = (text) => {
        setMessages((prev) => [...prev, createMessage(text, 'bot')]);
    }

    const addUserMessage = (text) => {
        setMessages((prev) => [...prev, createMessage(text, 'user')]);
    }
    
    useEffect(()=>{ 
        const fetchCounselor = async () => {
            try {
                const res = await axios.get(
                    `http://localhost/backend_consult/api/counsellorDetails.php?id=${counsellor_id}`
                );
                setCounselor(res.data);
                
                // Set initial message with counselor name
                setMessages([{
                    id: createId(),
                    text: `Good day, thanks for booking a session with ${res.data.name}. What date are you available? Please enter a date in YYYY-MM-DD format (e.g., 2026-03-25).`,
                    sender: "bot",
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                }]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchCounselor();
    }, [counsellor_id])

    const resetBookingState = () => {
        setPendingBooking(null);
        setAvailableSlots([]);
        setBookingStep('idle');
    }

    const parseDate = (text) => {
        const msg = text.toLowerCase().trim();
        const today = new Date();

        let match = msg.match(/\b\d{4}-\d{2}-\d{2}\b/);
        if (match) return match[0];

        match = msg.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (match) {
            const [, d, m, y] = match;
            return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }

        match = msg.match(/^(\d{1,2})\/(\d{1,2})$/);
        if (match) {
            const [, d, m] = match;
            const year = today.getFullYear();
            return `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }

        if (msg === 'today') {
            return today.toISOString().split('T')[0];
        }

        if (msg === 'tomorrow') {
            const d = new Date(today);
            d.setDate(d.getDate() + 1);
            return d.toISOString().split('T')[0];
        }

        return null;
    }

    const parseTime = (text) => {
        const msg = text.trim().toLowerCase();

        let match = msg.match(/^(\d{1,2}):(\d{2})$/);
        if (match) {
            let hour = parseInt(match[1], 10);
            const minute = match[2];

            if (hour >= 0 && hour <= 23) {
                return `${hour.toString().padStart(2, '0')}:${minute}`;
            }
        }

        match = msg.match(/^(\d{1,2})\s*(am|pm)$/);
        if (match) {
            let hour = parseInt(match[1], 10);
            const period = match[2];

            if (hour >= 1 && hour <= 12) {
                if (period === 'pm' && hour !== 12) hour += 12;
                if (period === 'am' && hour === 12) hour = 0;
                return `${hour.toString().padStart(2, '0')}:00`;
            }
        }

        return null;
    }

    const saveBooking = async (booking) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const form = new FormData();
            form.append('user_id', storedUser?.user_id || '');
            form.append('counsellor_id', id);
            form.append('name', storedUser?.name || '');
            form.append('email', storedUser?.email || '');
            form.append('phone', booking.phone || '');
            form.append('type', booking.type || '');
            form.append('date', booking.date || '');
            form.append('time', booking.time || '');
            form.append('issue', booking.issue || '');

            const res = await axios.post(
                'http://localhost/backend_consult/api/bookAppointment.php',
                form
            );

            console.log("Booking response:", res.data);

            if (res.data.success) {
                addBotMessage('✅ Appointment booked successfully!');
            } else {
                addBotMessage(res.data.message || 'Failed to book appointment.');
            }
        } catch (err) {
            console.error('Booking error:', err);
            addBotMessage('❌ Failed to book appointment.');
        }
    }

    const startBookingFlow = () => {
        setPendingBooking({
            date: '',
            time: '',
            type: '',
            issue: '',
            phone: ''
        });
        setAvailableSlots([]);
        setBookingStep('waiting_date');
        addBotMessage('Sure! Please enter your preferred date.')
    }

    const handleBookingFlow = async (userMessage) => {
        const lowerMsg = userMessage.toLowerCase().trim();

        if (lowerMsg === 'cancel') {
            resetBookingState();
            addBotMessage('Booking cancelled. You can ask another question or type "book appointment" to start again.');
            return true;
        }

        if (bookingStep === 'waiting_date') {
            const date = parseDate(userMessage);

            if (!date) {
                addBotMessage('Please enter a valid date.\nExample: 2026-03-26, 26/3, today, or tomorrow.');
                return true;
            }

            try {
                const res = await axios.get(`http://localhost/backend_consult/api/getAvailableSlots.php?counsellor_id=${counsellor_id}&date=${date}`)

                const slots = Array.isArray(res.data) ? res.data : [];
                setAvailableSlots(slots);

                if (slots.length === 0) {
                    addBotMessage('No available slots for that date. Please choose another date.');
                    return true;
                }

                const times = slots
                .map((slot) => slot.start?.substring(11, 16))
                .filter(Boolean);

                setPendingBooking((prev) => ({...prev,date}))

                setBookingStep('waiting_time');
                addBotMessage(`Available times on ${date}: ${times.join(', ')}.\nPlease choose a time.`);
                return true;
            } catch (error) {
                console.error(error);
                addBotMessage('Unable to check available slots right now.');
                return true;
            }
        }

        if (bookingStep === 'waiting_time') {
            const time = parseTime(userMessage);

            if (!time) {
                addBotMessage('Please enter a valid time.\nExample: 14:00 or 2pm.');
                return true;
            }

            const validTimes = availableSlots
                .map((slot) => slot.start?.substring(11, 16))
                .filter(Boolean);

            if (!validTimes.includes(time)) {
                addBotMessage(`That time is not available. Please choose one of these: ${validTimes.join(', ')}`);
                return true;
            }

            setPendingBooking((prev) => ({
                ...prev,
                time
            }))

            setBookingStep('waiting_type');
            addBotMessage('What type of session do you want?\nPlease type: Individual or Group');
            return true;
        }

        if (bookingStep === 'waiting_type') {
            const type = userMessage.trim();

            if (!type) {
                addBotMessage('Please enter a session type: Individual or Group.');
                return true;
            }

            setPendingBooking((prev) => ({...prev,type}));

            setBookingStep('waiting_issue');
            addBotMessage('Please briefly describe your issue.');
            return true;
        }

        if (bookingStep === 'waiting_issue') {
            const issue = userMessage.trim();

            if (!issue) {
                addBotMessage('Please describe your issue first.');
                return true;
            }

            setPendingBooking((prev) => ({...prev,issue}));

            setBookingStep('waiting_phone');
            addBotMessage('Please enter your phone number.');
            return true;
        }

        if (bookingStep === 'waiting_phone') {
            const phone = userMessage.trim();

            if (!phone) {
                addBotMessage('Please enter your phone number.');
                return true;
            }

            const updatedBooking = {
                ...pendingBooking,
                phone
            };

            setPendingBooking(updatedBooking);
            setBookingStep('confirm');

            addBotMessage(
                `Please confirm your booking:

                Name: ${storedUser?.name || '-'}
                Email: ${storedUser?.email || '-'}
                Phone: ${phone}
                Date: ${updatedBooking.date}
                Time: ${updatedBooking.time}
                Type: ${updatedBooking.type}
                Issue: ${updatedBooking.issue}

                Type "yes" to confirm or "no" to cancel.`
            )
            return true;
        }

        if (bookingStep === 'confirm') {
            if (lowerMsg === 'yes') {
                await saveBooking(pendingBooking);
                return true;
            }

            if (lowerMsg === 'no') {
                resetBookingState();
                addBotMessage('Booking cancelled. Type "book appointment" if you want to start again.');
                return true;
            }

            addBotMessage('Please type "yes" to confirm or "no" to cancel.');
            return true;
        }
        return false;
    }

    const handleAIResponse = async (userMessage) => {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are Rebecca, a friendly AI counselling assistant for a university appointment booking system.

                Rules:
                - Be short, clear, and friendly.
                - If the user wants to make an appointment, tell them to type "book appointment".
                - Do not invent available dates or times.
                - Do not confirm bookings yourself.
                - Booking is handled by the system separately.
                - If asked about counselling services, explain generally.
                - If asked general questions, answer helpfully.

                Counsellor name: ${counselor?.name || 'Unknown'}
                User name: ${storedUser?.name || 'User'}

                User message: ${userMessage}`
            });

            const botText =response.text?.trim() ||`I'm here to help. You can ask a question or type "book appointment".`;

            addBotMessage(botText);
            } catch (error) {
                console.error('AI Error:', error);
                addBotMessage(
                    `I'm having trouble answering right now. You can still type "book appointment" to continue with booking.`
                );
            }
    };


    const getBotResponse = async (userMessage) => {
        const lowerMsg = userMessage.toLowerCase().trim();

        if (lowerMsg === '##reset') {
            resetBookingState();
            setMessages([createMessage(`Done bossku`)]);
            return;
        }

        const detectedDate = parseDate(userMessage);
        const detectedTime = parseTime(userMessage);

        if (lowerMsg === 'book' || lowerMsg === 'book appointment' || lowerMsg === 'make appointment') {
            startBookingFlow();
            return;
        }

        const looksLikeBookingIntent = lowerMsg.includes('book') ||lowerMsg.includes('appointment') ||lowerMsg.includes('schedule') ||!!detectedDate;

        if (bookingStep === 'idle'&& looksLikeBookingIntent && detectedDate) {
            try {
                const res = await axios.get(
                    `http://localhost/backend_consult/api/getAvailableSlots.php?counsellor_id=${counsellor_id}&date=${detectedDate}`
                );

                const slots = Array.isArray(res.data) ? res.data : [];
                setAvailableSlots(slots);

                if (slots.length === 0) {
                    addBotMessage('No available slots for that date. Please choose another date.');
                    return;
                }

                const times = slots
                    .map((slot) => slot.start?.substring(11, 16))
                    .filter(Boolean);

                setPendingBooking({
                    date: detectedDate,
                    time: '',
                    type: '',
                    issue: '',
                    phone: ''
                });

                setBookingStep('waiting_time');
                addBotMessage(`Available times on ${detectedDate}: ${times.join(', ')}.\nPlease choose a time.`);
                return;
            } catch (error) {
                console.error(error);
                addBotMessage('Unable to check available slots right now.');
                return;
            }
        }

        // optional: if user gives time first while idle
        if (bookingStep === 'idle' && detectedTime) {
            addBotMessage(
            'I can help with booking. Please tell me the date first.\nExample: 2026-03-28, 28/3, today, or tomorrow.'
            );
            return;
        }

        if (bookingStep !== 'idle') {
            await handleBookingFlow(userMessage);
            return;
        }

        await handleAIResponse(userMessage);
    }

    const handleSend = async () => {
        const text = inputValue.trim();
        if (!text) return;

        addUserMessage(text);
        setInputValue('');

        await getBotResponse(text);
    }

    return (
        <div className="chat-container">
            <Navbar/>
            <div className="chat-header">
                <button className="back-btn">❮</button>
                <div className="user-info">
                    <div className="avatar-wrapper">
                        <div className="avatar">👩‍💼</div>
                        <span className="online-status"></span>
                    </div>
                    <span className="username">Rebecca</span>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat-window">
                <div className="date-badge">Today</div>
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender}`}>
                        <div className="message-bubble">
                        {msg.text}
                        {msg.time && <span className="message-time">{msg.time}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="input-area">
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Type your message......" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="send-btn" onClick={() => handleSend()}>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#333"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chatbot