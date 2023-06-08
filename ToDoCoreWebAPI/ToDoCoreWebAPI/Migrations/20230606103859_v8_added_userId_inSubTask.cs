using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoCoreWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class v8_added_userId_inSubTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "SubTasks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubTasks_UserId",
                table: "SubTasks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubTasks_Users_UserId",
                table: "SubTasks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubTasks_Users_UserId",
                table: "SubTasks");

            migrationBuilder.DropIndex(
                name: "IX_SubTasks_UserId",
                table: "SubTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SubTasks");
        }
    }
}
