﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ToDoCoreWebAPI.EF;

#nullable disable

namespace ToDoCoreWebAPI.Migrations
{
    [DbContext(typeof(UserDbContext))]
    [Migration("20230602100111_v4_Added_code_into_User")]
    partial class v4_Added_code_into_User
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ToDoCoreWebAPI.Model.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Priorities");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.SubTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.Property<int>("TaskPriorityId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("TaskPriorityId");

                    b.ToTable("SubTasks");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Bookmark")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TaskCategoryId")
                        .HasColumnType("int");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TaskCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.SubTask", b =>
                {
                    b.HasOne("ToDoCoreWebAPI.Model.Task", "Task")
                        .WithMany("SubTask")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ToDoCoreWebAPI.Model.Priority", "TaskPriority")
                        .WithMany()
                        .HasForeignKey("TaskPriorityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("TaskPriority");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.Task", b =>
                {
                    b.HasOne("ToDoCoreWebAPI.Model.Category", "TaskCategory")
                        .WithMany()
                        .HasForeignKey("TaskCategoryId");

                    b.HasOne("ToDoCoreWebAPI.Model.User", "User")
                        .WithMany("Task")
                        .HasForeignKey("UserId");

                    b.Navigation("TaskCategory");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.User", b =>
                {
                    b.HasOne("ToDoCoreWebAPI.Model.User", null)
                        .WithMany("users")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.Task", b =>
                {
                    b.Navigation("SubTask");
                });

            modelBuilder.Entity("ToDoCoreWebAPI.Model.User", b =>
                {
                    b.Navigation("Task");

                    b.Navigation("users");
                });
#pragma warning restore 612, 618
        }
    }
}
