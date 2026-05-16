--
-- PostgreSQL database dump
--

\restrict iSza75hQcKiiWfthtHUrYHgrhouk1w25015p0fNdd70MkdjjlJg7gW8RmjcHyo0

-- Dumped from database version 17.8 (9c8634e)
-- Dumped by pg_dump version 17.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Admin" (
    id text NOT NULL,
    username text NOT NULL,
    "passwordHash" text NOT NULL
);


ALTER TABLE public."Admin" OWNER TO neondb_owner;

--
-- Name: Appointment; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Appointment" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "customerId" text NOT NULL,
    "serviceId" text NOT NULL,
    "priceAtBooking" double precision NOT NULL,
    "staffId" text NOT NULL,
    "userPackageId" text,
    notes text,
    status text DEFAULT 'SCHEDULED'::text NOT NULL
);


ALTER TABLE public."Appointment" OWNER TO neondb_owner;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    notes text
);


ALTER TABLE public."Customer" OWNER TO neondb_owner;

--
-- Name: Installment; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Installment" (
    id text NOT NULL,
    "paidAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount double precision NOT NULL,
    note text,
    "userPackageId" text NOT NULL
);


ALTER TABLE public."Installment" OWNER TO neondb_owner;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Service" (
    id text NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public."Service" OWNER TO neondb_owner;

--
-- Name: Staff; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Staff" (
    id text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'Technician'::text NOT NULL
);


ALTER TABLE public."Staff" OWNER TO neondb_owner;

--
-- Name: UserPackage; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."UserPackage" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    "totalSessions" integer NOT NULL,
    "remainingSessions" integer NOT NULL,
    "totalPrice" double precision NOT NULL,
    "paidAmount" double precision DEFAULT 0 NOT NULL,
    "customerId" text NOT NULL,
    "serviceId" text
);


ALTER TABLE public."UserPackage" OWNER TO neondb_owner;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Admin" (id, username, "passwordHash") FROM stdin;
clccb17eff-80d5-4d19-9454-79dfc4440449	lamees	$2b$10$TyGXK5c7tuo1dfO1puJpVOZiqzneXDHUMnmikXPos5pa9S7gouhni
\.


--
-- Data for Name: Appointment; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Appointment" (id, "createdAt", "startTime", "customerId", "serviceId", "priceAtBooking", "staffId", "userPackageId", notes, status) FROM stdin;
cmp3128xq000104jlap7t3qrd	2026-05-12 19:32:31.55	2026-05-13 09:00:00	cmp3128he000004jlpd9qh8o4	cmp1w01y7000104jrfenv63bt	600	cmp1vzo8q000004jrp1whmcdm	\N	\N	CANCELLED
cmp3128xn000004k3phytjk7w	2026-05-12 19:32:31.547	2026-05-13 09:00:00	cmp3128he000004jlpd9qh8o4	cmp1w01y7000104jrfenv63bt	600	cmp1vzo8q000004jrp1whmcdm	\N	\N	COMPLETED
cmp6zfwf4000104lbf5vmczwp	2026-05-15 13:58:13.984	2026-05-15 14:00:00	cmp6zfvq3000004lbpurljwme	cmp3189kx000504jlsmgj9yb2	20	cmp1vzo8q000004jrp1whmcdm	\N	\N	COMPLETED
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Customer" (id, "createdAt", name, phone, notes) FROM stdin;
cmp3128he000004jlpd9qh8o4	2026-05-12 19:32:30.962	Sace	05374846720	\N
cmp6zfvq3000004lbpurljwme	2026-05-15 13:58:13.083	Fatima Faraç	05398463245	\N
cmp7hkyap000004jla74tg435	2026-05-15 22:26:02.785	mo	05333382827	\N
cmp7ib2vn0000hwjegzp8xo52	2026-05-15 22:46:21.78	lamees	05746583958	\N
cmp7kh79h000004lb1nmz0zec	2026-05-15 23:47:06.629	lololol	05872846896	\N
\.


--
-- Data for Name: Installment; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Installment" (id, "paidAt", amount, note, "userPackageId") FROM stdin;
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Service" (id, name, price, duration) FROM stdin;
cmp3143t1000204jlpvxo3q8l	Proteztırnak	1000	120
cmp314mge000304jlznmom41k	Pedikür	850	60
cmp3166za000404jl3f1trh3n	Cilt bakım	750	40
cmp3189kx000504jlsmgj9yb2	Percing	20	30
cmp1w01y7000104jrfenv63bt	Manikür	550	45
\.


--
-- Data for Name: Staff; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Staff" (id, name, role) FROM stdin;
cmp1vzo8q000004jrp1whmcdm	Lamees	Manager
\.


--
-- Data for Name: UserPackage; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."UserPackage" (id, "createdAt", name, "totalSessions", "remainingSessions", "totalPrice", "paidAmount", "customerId", "serviceId") FROM stdin;
\.


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: Appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: Installment Installment_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Installment"
    ADD CONSTRAINT "Installment_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: Staff Staff_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Staff"
    ADD CONSTRAINT "Staff_pkey" PRIMARY KEY (id);


--
-- Name: UserPackage UserPackage_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserPackage"
    ADD CONSTRAINT "UserPackage_pkey" PRIMARY KEY (id);


--
-- Name: Admin_username_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Admin_username_key" ON public."Admin" USING btree (username);


--
-- Name: Customer_phone_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Customer_phone_key" ON public."Customer" USING btree (phone);


--
-- Name: Appointment Appointment_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."Staff"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_userPackageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_userPackageId_fkey" FOREIGN KEY ("userPackageId") REFERENCES public."UserPackage"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Installment Installment_userPackageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Installment"
    ADD CONSTRAINT "Installment_userPackageId_fkey" FOREIGN KEY ("userPackageId") REFERENCES public."UserPackage"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPackage UserPackage_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserPackage"
    ADD CONSTRAINT "UserPackage_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPackage UserPackage_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."UserPackage"
    ADD CONSTRAINT "UserPackage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict iSza75hQcKiiWfthtHUrYHgrhouk1w25015p0fNdd70MkdjjlJg7gW8RmjcHyo0

