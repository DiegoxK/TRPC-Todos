# TRPC Todo App

A full-stack Todo application built with the T3 Stack, featuring a comprehensive suite of tools designed to showcase a modern web development workflow.
    
<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white" alt="tRPC"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM"/>
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextauth.js&logoColor=white" alt="NextAuth.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query"/>
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form"/>
  <img src="https://img.shields.io/badge/UploadThing-CC3443?style=for-the-badge&logo=uploadthing&logoColor=white" alt="UploadThing"/>
</div>

<br/>

<img width="1360" height="768" alt="{87FA9916-802F-4E37-AE2A-D7C47AAEC0BF}" src="https://github.com/user-attachments/assets/fc8663cc-a69b-4d98-9dc7-4a863efccfc6" />

## ✨ Live Demo

[Ver la aplicación en vivo](https://trpc-todos.vercel.app)

## 🚀 Features

*   **Full CRUD Functionality for Todos:** Create, read, update, and delete todos with a user-friendly interface.
*   **Advanced Data Table:** A custom-built, reusable data table component using `@tanstack/react-table` with the following features:
    *   **Column Sorting:** Sort todos by any column.
    *   **Column Filtering:** Filter todos by task, priority, and status.
    *   **Faceted Filtering:** Advanced filtering with faceted search capabilities.
    *   **Row Selection:** Select and perform bulk actions on multiple todos.
    *   **Pagination:** Paginate through large sets of data.
    *   **Column Resizing:** Adjust column widths for a personalized view.
*   **User Authentication:** Secure authentication with NextAuth.js, including email/password and OAuth providers.
*   **Profile Customization:**
    *   **Image Uploads:** Users can upload their own profile pictures.
    *   **Image Cropping:** An image cropper with `react-image-crop` allows users to crop their profile picture.
    *   **UploadThing Integration:** Seamlessly handles image uploads and storage with UploadThing.
*   **Project Management:** Organize todos by projects.
*   **End-to-End Type Safety:** Guaranteed type safety from the database to the client with tRPC and Zod.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
*   **API:** [tRPC](https://trpc.io/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Validation:** [Zod](https://zod.dev/)
*   **File Uploads:** [UploadThing](https://uploadthing.com/)
*   **Deployment:** [Vercel](https://vercel.com/)

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or later)
*   pnpm
*   Docker (for running a local PostgreSQL database)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/DiegoxK/TRPC-Todos.git
    ```
2.  **Install NPM packages**
    ```sh
    pnpm install
    ```
3.  **Set up environment variables**

    Create a `.env` file in the root of the project and add the following variables:

    ```env
    # Drizzle
    DATABASE_URL=""
    
    # Next Auth
    # You can generate a new secret on the command line with:
    # openssl rand -base64 32
    # https://next-auth.js.org/configuration/options#secret
    NEXTAUTH_SECRET=""
    NEXTAUTH_URL=""
    
    # Next Auth Discord Provider
    DISCORD_CLIENT_ID=""
    DISCORD_CLIENT_SECRET=""
    
    # Next Auth Email Provider
    EMAIL_SERVER_USER=""
    EMAIL_SERVER_PASSWORD=""
    EMAIL_SERVER_HOST=""
    EMAIL_SERVER_PORT=""
    EMAIL_FROM=""
    
    # UploadThing keys
    UPLOADTHING_SECRET=""
    UPLOADTHING_APP_ID=""
    
    #Auth roles
    USER_ROLE=""
    ADMIN_ROLE=""
    ```

4.  **Run database migrations**
    ```sh
    pnpm db:push
    ```
5.  **Run the development server**
    ```sh
    pnpm dev
    ```

